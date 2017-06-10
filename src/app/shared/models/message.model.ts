//                                             \ / _
//                                       ___,,,
//                                       \_[o o]
//      Errare humanum est!              C\  _\/
//              /                     _____),_/__
//         ________                  /     \/   /
//       _|       .|                /      o   /
//      | |       .|               /          /
//       \|       .|              /          /
//        |________|             /_        \/
//        __|___|__             _//\        \
//  _____|_________|____       \  \ \        \
//                     _|       ///  \        \
//                    |               \       /
//                    |               /      /
//                    |              /      /
//  ________________  |             /__    /_
//  b'ger        ...|_|.............. /______\.......


/**
 * Rappresenta un messaggio 
 */
export class Message {

    /**
     * Identificativo univoco del messaggio d'errore
     */
    private _statusCode: number;

    /**
     * Descrizione del messaggio d'errore
     */
   private  _message: string;

   private  _title: string;

    /**
     * Tipo di messaggio d'errore
     */
   private _type: MessageType = MessageType.BLOCCANTE;

   
    /**
     * Indica se il messaggio d'errore è stato gestito
     */
    private _gestito: boolean = false;

    /**
     * Dichiara gestito il messaggio d'errore.
     */
    gestito() {
        console.log("l'errore è stato gestito");
        this._gestito = true;
    }

    /**
     * Info se il messaggio d'errore è stato gestito o meno
     */
    isGestito(): boolean {
        return this._gestito;
    }

   
   
	public get statusCode(): number {
		return this._statusCode;
	}

	public set statusCode(value: number) {
		this._statusCode = value;
	}

	public get message(): string {
		return this._message;
	}

	public set message(value: string) {
		this._message = value;
	}
     

	
	public get type(): MessageType  {
		return this._type;
	}

	public set type(value: MessageType ) {
		this._type = value;
	}
      

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

}

/**
 * Indentifica le tipologie di messaggi d'errore
 */
export enum MessageType {
    /**
     * L'applicazione non può funzionare con questo errore. -> di solito tradotto dal dimmer
     */
    BLOCCANTE,
    /**
     * L'applicazione ha ricevuto un messaggio gestito. -> di solito viene comunicato l'errore all'utente
     */
    APPLICATIVO,
    /**
     * L'errore riguarda l'autenticazione -> di solito l'utente viene buttato fuori dall'applicativo.
     */
    AUTENTICAZIONE,
    
    /* Solo per comunicare qualcosa all'utente*/
    INFORMATIVO
}


