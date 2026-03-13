import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import User from '../models/user.model.js';
import Session from '../models/session.model.js';
import Post from '../models/post.model.js';

describe('Post API - complete CRUD', () => {
    let cookies;
    let id;

    beforeAll(async () => {
        const user = await User.create({
            email: "auth@tests.com",
            password: "password123",
            userName: 'JohnDoe',
        });
        
        const session = await Session.create({ user: user._id });
        cookies = [`sessionId=${session._id.toString()}`];
        id = user.id;
    });

    // ============================================
    // CREATE - POST /api/posts
    // ============================================
    describe('POST /api/posts', () => {
        it('should correctly create a new post', async () => {
            const newPost = {
                content: 'This is a new post',
                user: id,
            };

            const response = await request(app)
                .post('/api/posts')
                .set("Cookie", cookies)
                .send(newPost)
                .expect(201);
            
            expect(response.body.content).toBe('This is a new post');
            expect(response.body.user).toBe(id);
            expect(response.body.id).toBeDefined(id);

            const postInDB = await Post.findById(response.body.id);
            expect(postInDB).not.toBeNull();
            expect(postInDB.content).toBe('This is a new post');
        });

        it('should return 400 if post content is missing', async () => {
            const badPost = {
                user: id,
            };

            const response = await request(app)
                .post('/api/posts')
                .set("Cookie", cookies)
                .send(badPost)
                .expect(400);
            
            expect(response.body.content.message).toBe('Path `content` is required.');
        });
    });

    // ============================================
    // GET ALL - GET /api/posts
    // ============================================
    describe('GET /api/posts', () => {
        it('should return an empty array if there are no posts', async () => {
            await Post.deleteMany();

            const response = await request(app)
                .get('/api/posts')
                .set('Cookie', cookies)
                .expect(200);

            expect(response.body).toEqual([]);
        });

        it('should return all existing posts', async () => {
            await Post.create({
                content: 'user1@example.com',
                user: id,
            });

            await Post.create({
                content: 'user2@example.com',
                user: id,
            });

            await Post.create({
                content: 'user3@example.com',
                user: id,
            });   

            await Post.create({
                content: 'user4@example.com',
                user: id,
            });          

            const response = await request(app)
                .get('/api/posts')
                .set('Cookie', cookies)
                .expect(200);

            expect(response.body).toHaveLength(4);
            expect(response.body[0].content).toBe("user4@example.com");
            expect(response.body[3].content).toBe("user1@example.com");
        });
    });

    // ============================================
    // READ ONE - GET /api/posts
    // ============================================
    describe('GET /api/users/:id', () => {
        it("should include the post's comments (populate)", async () => {           
            const post = await Post.create({
                content: 'user1@example.com',
                user: id,
            });

            const response = await request(app)
                .get(`/api/posts`)
                .set('Cookie', cookies)
                .expect(200);

            expect(response.body[0].comments).toBeDefined();
            expect(Array.isArray(response.body[0].comments)).toBe(true);
        });
    });
        
    // ============================================
    // DELETE - DELETE /api/posts/:id
    // ============================================
    describe("DELETE /api/posts/:id", () => {
        it("should delete your own post", async () => {
            const user = await User.create({
                email: 'auth@tests.com',
                password: 'password123',
                userName: 'JohnDoe',
            });

            const session = await Session.create({ user: user._id });
            cookies = [`sessionId=${session._id.toString()}`];

            const post = await Post.create({
                content: 'This is my post',
                user: user.id,
            });

            await request(app)
                .delete(`/api/posts/${post.id}`)
                .set("Cookie", cookies)
                .expect(204);

            const postInDB = await Post.findById(post.id);
            expect(postInDB).toBeNull();
        });

        it('should return 403 if you try to delete a post you do not own', async () => {
            const otherUser = await User.create({
                email: 'other@tests.com',
                password: 'password123',
                userName: 'OtherUser',
            });

            const otherPost = await Post.create({
                content: 'This is an other post',
                user: otherUser.id,
            })

            const user = await User.create({
                email: 'auth@tests.com',
                password: 'password123',
                userName: 'JohnDoe',
            });

            const session = await Session.create({ user: user._id });
            cookies = [`sessionId=${session._id.toString()}`];

            const response = await request(app)
                .delete(`/api/posts/${otherPost.id}`)
                .set('Cookie', cookies);

            expect(response.status).toBe(403);
            expect(response.body.message).toBe("It is not your post!");
        });

        it('should return 404 if the post to delete does not exist', async () => {
            const fakeId = "64f1a2b3c4d5e6f7a8b9c0d1";
            const user = await User.create({
                email: 'auth@tests.com',
                password: 'password123',
                userName: 'JohnDoe',
            });

            const session = await Session.create({ user: user._id });
            cookies = [`sessionId=${session._id.toString()}`];

            const post = await Post.create({
                content: 'This is my post',
                user: user.id,
            });

            const response = await request(app)
                .delete(`/api/posts/${fakeId}`)
                .set('Cookie', cookies);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Post not found');
        });
    });

    // ============================================
    // INTEGRATION - Complete CRUD Flow
    // ============================================
    describe('Complete CRUD Flow', () => {
        it('should create, get and delete a post', async () => {
            const newPost = {
                content: 'This is a complete CRUD flow post',
                user: id,
            }

            const createRes = await request(app)
                .post('/api/posts')
                .set('Cookie', cookies)
                .send(newPost)
                .expect(201);

            const postId = createRes.body.id;
            expect(postId).toBeDefined();

            const readRes = await request(app)
                .get(`/api/posts`)
                .set("Cookie", cookies)
                .expect(200);
    
                expect(readRes.body[0].content).toBe('This is a complete CRUD flow post');

            await request(app)
                .delete(`/api/posts/${postId}`)
                .set('Cookie', cookies)
                .expect(204);

            const postInDB = await Post.findById(postId);
            expect(postInDB).toBeNull();
        });
    });
});