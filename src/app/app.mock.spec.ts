// IONIC MOCKS:

export class NavMock {

    public pop(): any {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }

    public push(): any {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }

    public getActive(): any {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }
}

export class PlatformMock {
    public ready(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class MenuMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}
