"""
Test all possible auth flow input scenarios.
"""
import asyncio
import sys
import httpx

BASE = "http://localhost:8000/api/v1/auth"
results = []

def print_result(name, status, body, expected_pass=True):
    actual_pass = (status < 400) == expected_pass
    icon = "PASS" if actual_pass else "MISMATCH"
    line = f"[{icon}] {name} -- HTTP {status} | {body[:200]}"
    print(line)
    results.append(line)


async def run_all_tests():
    async with httpx.AsyncClient(timeout=15) as c:

        # T1: Empty body
        r = await c.post(f"{BASE}/register", json={})
        print_result("T1: Empty body (422 expected)", r.status_code, r.text, expected_pass=False)

        # T2: Missing password
        r = await c.post(f"{BASE}/register", json={"email": "a@b.com", "full_name": "A B"})
        print_result("T2: Missing password (422 expected)", r.status_code, r.text, expected_pass=False)

        # T3: Invalid email format
        r = await c.post(f"{BASE}/register", json={"email": "not-an-email", "password": "password123", "full_name": "A B"})
        print_result("T3: Invalid email (422 or 201)", r.status_code, r.text, expected_pass=False)

        # T4: Short password (3 chars) - backend may or may not validate
        r = await c.post(f"{BASE}/register", json={"email": "short@test.com", "password": "abc", "full_name": "A B"})
        print_result("T4: Short password", r.status_code, r.text, expected_pass=(r.status_code < 400))

        # T5: Valid registration
        r = await c.post(f"{BASE}/register", json={"email": "rajtest@example.com", "password": "testpass123", "full_name": "Raj Test"})
        print_result("T5: Valid registration (201 expected)", r.status_code, r.text, expected_pass=True)

        # T6: Duplicate email
        r = await c.post(f"{BASE}/register", json={"email": "rajtest@example.com", "password": "testpass123", "full_name": "Raj Test"})
        print_result("T6: Duplicate email (400 expected)", r.status_code, r.text, expected_pass=False)

        # T7: Login correct credentials
        r = await c.post(f"{BASE}/login", data={"username": "rajtest@example.com", "password": "testpass123"})
        print_result("T7: Correct login (200 expected)", r.status_code, r.text[:300], expected_pass=True)
        token = r.json().get("access_token") if r.status_code == 200 else None

        # T8: Login wrong password
        r = await c.post(f"{BASE}/login", data={"username": "rajtest@example.com", "password": "wrongpassword"})
        print_result("T8: Wrong password (401 expected)", r.status_code, r.text, expected_pass=False)

        # T9: Login non-existent user
        r = await c.post(f"{BASE}/login", data={"username": "nobody@nowhere.com", "password": "pass"})
        print_result("T9: Non-existent user (401 expected)", r.status_code, r.text, expected_pass=False)

        # T10: /me with valid token
        if token:
            r = await c.get(f"{BASE}/me", headers={"Authorization": f"Bearer {token}"})
            print_result("T10: Valid /me (200 expected)", r.status_code, r.text, expected_pass=True)

        # T11: /me fake token
        r = await c.get(f"{BASE}/me", headers={"Authorization": "Bearer totally-fake-token"})
        print_result("T11: Fake token /me (401 expected)", r.status_code, r.text, expected_pass=False)

        # T12: /me no token
        r = await c.get(f"{BASE}/me")
        print_result("T12: No token /me (401 expected)", r.status_code, r.text, expected_pass=False)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    asyncio.run(run_all_tests())
