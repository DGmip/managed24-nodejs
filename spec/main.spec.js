"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const req = __importStar(require("request"));
let url = 'http://localhost:4000/names?apiKey=d25d81b8-9986-4202-80da-b33a6c233580&search=milly';
const apiKey = 'd25d81b8-9986-4202-80da-b33a6c233580';
const badApiKey = 'd25d81b8-9986-4202-80da-b33a6c23358';
describe('Server', () => {
    let data = {
        status: 0,
        body: {}
    };
    beforeEach(() => {
    });
    afterAll(() => {
    });
    describe(`Get /names search for 'milly'`, () => {
        const expectedResult = [{ _id: '5c5e872caa69ef4be123ed27', name: 'Milly Shipman fail' }];
        beforeAll((done) => {
            req.get(url, (error, res, body) => {
                data.body = res.body;
                done();
            });
        });
        it('Expected results', () => {
            expect(data.body).toBeTruthy();
        });
    });
    describe(`404 with the wrong route`, () => {
        beforeAll((done) => {
            url = 'http://localhost:4000/bad-route';
            req.get(url, (error, res, body) => {
                data.status = res.statusCode;
                done();
            });
        });
        it('should throw 404', () => {
            expect(data.status).toEqual(404);
        });
    });
    describe(`GET /names no search queryParameter`, () => {
        beforeAll((done) => {
            url = 'http://localhost:4000/names?apiKey=' + apiKey;
            req.get(url, (error, res, body) => {
                data.body = res.body;
                data.status = res.statusCode;
                done();
            });
        });
        it('should throw 500 error', () => {
            expect(data.status).toBe(500);
        });
    });
    describe(`GET with invalid API Key should throw 403`, () => {
        beforeAll((done) => {
            url = 'http://localhost:4000/names?apiKey=' + badApiKey + '&search=milly';
            req.get(url, (error, res, body) => {
                data.body = res.body;
                data.status = res.statusCode;
                done();
            });
        });
        it('should throw 403 error', () => {
            expect(data.status).toBe(403);
        });
    });
    // describe(`404 with the wrong route`, () => {
    //   const data: any = {}
    //   beforeAll((done) => {
    //     url = 'http://localhost:4000/bad-route'
    //     req.get(url, (error, res: req.Response, body) => {
    //       data.error = error
    //       data.status = res.statusCode
    //       done()
    //     })
    //   })
    //   it('should throw 404', () => {
    //     expect(data.status).toEqual(404)
    //   })
    // })
    // describe(`404 with the wrong route`, () => {
    //   const data: any = {}
    //   beforeAll((done) => {
    //     url = 'http://localhost:4000/bad-route'
    //     req.get(url, (error, res: req.Response, body) => {
    //       data.error = error
    //       data.status = res.statusCode
    //       done()
    //     })
    //   })
    //   it('should throw 404', () => {
    //     expect(data.status).toEqual(404)
    //   })
    // })
    // it(`should successfully search for 'milly' GET /names`, () => {
    // })
});
