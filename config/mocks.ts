// IONIC:

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

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

export class MenuControllerMock {
    public open(menuId?: string): Promise<boolean> {
        return Promise.resolve(true);  
    }
    public close(menuId?: string): Promise<boolean> {
        return Promise.resolve(true);
    };

    public toggle(menuId?: string): Promise<boolean> {
        return Promise.resolve(true);
    };
    
    public enable(shouldEnable: boolean, menuId?: string): any {
        return {};   
    };
}

export class KeyboardMock {

    public isOpen(): boolean {
        return true;   
    }
    public onClose(callback: Function, pollingInternval?: number, pollingChecksMax?: number): Promise<any> {
        return Promise.resolve({});   
    }
    
    public close(): void {};
    
    public focusOutline(setting: any, document: any): void {}
}

export class GestureControllerMock {

    public create(name: string, opts?: any): any {
        return {}
    }
    
    public newID(): number {
        return 0;   
    }
    
    public start(gestureName: string, id: number, priority: number): boolean {
        return true;   
    }
    
    public capture(gestureName: string, id: number, priority: number): boolean {
        return true;   
    }
    
    public release(id: number): void {}

}

export class FormMock {
    public register(input: any): void {}

    public deregister(input: any): void {};
    public focusOut(): void {};
    public setAsFocused(input: any): void {};
    public tabFocus(currentInput: any): any {
        return {};   
    };
    public nextId(): number {
        return 0;   
    };
}