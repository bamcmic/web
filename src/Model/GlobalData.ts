export interface DConfig {
    ApiUrl: string;
    WsUrl: string;
    CurrentUser: any | null;
}


export var _config:DConfig = {
    ApiUrl: 'http://127.0.0.1:8000/',
    WsUrl: 'ws://127.0.0.1:8000/ws' ,
    CurrentUser: localStorage.getItem('CurrentUser') ? JSON.parse(localStorage.getItem('CurrentUser') as string) : null,
};

export const IsAdmin = () => {
    if(_config.CurrentUser.permission == null) return false;
    return _config.CurrentUser.permission.includes("Admin") ? true : false;
}
export const IsDevlop = () => {
    if(_config.CurrentUser.permission == null) return false;
    return _config.CurrentUser.permission.includes("Devlop") ? true : false;
}
