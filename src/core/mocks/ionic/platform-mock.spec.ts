export class PlatformMock {
    public ready(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}
