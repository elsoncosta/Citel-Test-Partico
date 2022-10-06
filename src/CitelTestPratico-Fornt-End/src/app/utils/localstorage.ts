export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('devio.user')!);
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('devio.token')!;
    }

    public obterNomeUsuario(): string {
        let data = JSON.parse(localStorage.getItem("devio.user")!);
        if(data==null)
            return "";

        for(let index in data.claims)
        {
            if(data.claims[index].type== 'email')
            {
                return data.claims[index].value;
            }           
        }
        
        return "";
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('devio.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }

}