export class NavMock {

    public pop(): any {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public push(): any {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public getActive(): any {
        return {
            instance: {
                model: 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }
}
