export class Log{
    private _logRiegoId: number;
    private _apertura: number;
    private _fecha: String;
    private _electrovalvulaId: number;

    constructor(logRiegoId,apertura,fecha,electrovalvulaId){
        this._logRiegoId=logRiegoId;
        this.apertura=apertura;
        this._fecha=fecha;
        this._electrovalvulaId=electrovalvulaId;
    }

    public get logRiegoId(): number {
        return this._logRiegoId;
    }
    public set logRiegoId(value: number) {
        this._logRiegoId = value;
    }

    public get fecha(): String {
        return this._fecha;
    }
    public set fecha(value: String) {
        this._fecha = value;
    }

    public get apertura(): number {
        return this._apertura;
    }
    public set apertura(value: number) {
        this._apertura = value;
    }

    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }
}
