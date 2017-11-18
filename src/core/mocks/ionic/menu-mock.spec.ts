export class MenuMock {
    public close(): any {
        return new Promise((resolve: () => any) => {
            resolve();
        });
    }
}
