// Public API buscar por id
// Performance Test
//  Ramp up 10vu em 10s 
//  Carga 10vu por 10s
//  Ramp down 0vu em 10s
// Limites sucesso > 95% | p90 < 200ms

import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(90) < 200']
    }
}

const data = new SharedArray('Leitura do json', function () {
    return JSON.parse(open('./Atividade2_PerformanceTestDinamico.json')).users;
});

export default function(){
    const userId = data[Math.floor(Math.random() * data.length)].id;

    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;

    const res = http.get(BASE_URL);

    check(res, {
        'status code 200': (r) => r.status === 200
    });

    sleep(1)

}