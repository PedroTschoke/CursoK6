// Registration e auth - login
//Stress Test
//Carga 
//  Ramp up 5vu em 5s
//  Carga 5vu por 5s
//  Ramp up 50vu em 2s
//  Carga de 50vu em 2s
//  ramp sown 0vu em 5s
// Limites falha < 1%

import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01']
    }
};

const csvData = new SharedArray('Ler Dados', function(){
    return papaparse.parse(open('./Atividade4_StressTest.csv'),{header: true}).data;
});

export default function(){
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email;
    const PASS = 'user123';
    const BASE_URL = 'https://test-api.k6.io';

    console.log(USER);

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USER,
        password: PASS
    });

    check(res, {
       'Sucesso Login': (r) => r.status === 200,
       'Token gerado': (r) => r.json('acess') !== '' 
    });
    
    sleep(1)
}