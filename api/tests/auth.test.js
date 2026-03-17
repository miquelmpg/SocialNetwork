import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from '../app.js';
import Session from "../models/session.model.js";
import { createUser } from "../utils";

describe("POST /api/sessions (login)", () => {
    beforeAll(async () => {
        await createUser("juan1@example.com", "password123", "JuanPe");
    });

    it("happy case", async () => {
        const response = await request(app)
            .post("/api/sessions")
            .send({
            email: "juan1@example.com",
            password: "password123",
        })
        .expect(200);

        expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("401 if user does not exist", async () => {
        await request(app)
            .post("/api/sessions")
            .send({
            email: "juanDoesNotExist@example.com",
            password: "password123",
            })
        .expect(401);
    });

    it("401 if wrong password", async () => {
        await request(app)
            .post("/api/sessions")
            .send({
            email: "juan1@example.com",
            password: "WRONG",
            })
            .expect(401);
    });

    it("400 if email is missing", async () => {
        const response = await request(app)
            .post("/api/sessions")
            .send({
            password: "WRONG",
            })
            .expect(400);

            expect(response.body.message).toBe('missing email or password');
    });

    it("400 if password is missing", async () => {
        const response = await request(app)
            .post("/api/sessions")
            .send({
            email: "juan1@example.com",
            })
            .expect(400);

            expect(response.body.message).toBe('missing email or password');
    });

    it("GET user profile", async () => {
        const response = await request(app)
            .post('/api/sessions')
            .send({
            email: "juan1@example.com",
            password: "password123",
            })
            .expect(200);

        const loginCookies = response.headers["set-cookie"];

        const profileResponse = await request(app)
            .get(`/api/users/${response.body.id}`)
            .set("Cookie", loginCookies)
            .expect(200);

        expect(profileResponse.body.email).toBe("juan1@example.com");
    });

    // ============================================
    // INTEGRATION - Complete CRUD Flow
    // ============================================
    describe("DELETE /api/sessions (logout)", () => {  
        it('should register, login and logout a user', async () => {
            const user = await createUser('example@exmple.com', 'password123', 'EXAMPLE');

            const responseLogin = await request(app)
                .post("/api/sessions")
                .send({
                email: "example@exmple.com",
                password: "password123",
            })
            .expect(200);

            expect(responseLogin.headers["set-cookie"]).toBeDefined();

            const cookies = responseLogin.headers["set-cookie"];
            
            const userId = responseLogin.body.id;

            await request(app)
                .delete("/api/sessions")
                .set('Cookie', cookies)
                .send({
                email: "example@exmple.com",
                password: "password123",
            })
            .expect(204);

            const sessionInDB = await Session.findById(userId);
            expect(sessionInDB).toBeNull();
        });
    });
});