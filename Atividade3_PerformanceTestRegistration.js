// Registration e auth
// Performance Test
// Carga 10VU por 10s
// Limites Falha < 1% | Duracao p(95) < 500 | Sucesso > 95%

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [{ duration: '10s', target: 10 }],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
};

export default function(){
    const BASE_URL = 'https://test-api.k6.io';
    const USER = `${Math.random()}@email.com`;
    const PASS = 'user123';

    console.log( USER + PASS );

    const res = http.post(`${BASE_URL}/user/register`, {
        username: USER,
        first_name: 'crocodilo',
        last_name: 'dino',
        email: USER,
        password: PASS
    });

    check(res, {
       'sucesso ao registrar': (r) => r.status === 201
    });

    sleep(1)
}