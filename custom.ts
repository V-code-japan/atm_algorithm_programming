/**
 * ATM Custom Blocks
 *
 * MakeCode側ではATMの「ロジック」を構築し、
 * 数値化した命令列（ATM Bytecode）としてScriptAPIへ送信する。
 *
 * MakeCode側：
 *   ・画面を表示しない
 *   ・条件を判定しない
 *   ・状態を管理しない
 *   ・ATMのロジックを命令列として構築する
 *
 * ScriptAPI側：
 *   ・命令列を解釈する
 *   ・画面を表示する
 *   ・ボタン入力を待つ
 *   ・条件を判定する
 *   ・状態を管理する
 */

/**
 * ATMで使用するメニュー
 */
//% blockHidden=true
enum AtmMenu {
    //% block="残高確認"
    Balance,

    //% block="預金"
    Deposit,

    //% block="引き出し"
    Withdraw,

    //% block="チャージ"
    Charge
}

/**
 * ScriptAPIへ送信する命令
 *
 * 1命令につき1つの数値を使用する。
 *
 * 引数を必要とする命令は、
 *
 *   [Opcode, Argument]
 *
 * の順番で格納する。
 *
 * 例：
 *
 *   SHOW_MENU, Balance
 *
 * → [3, 0]
 */
//% blockHidden=true
enum AtmOpcode {

    // ATMを起動
    Run,

    // ATMを終了
    End,

    // メインメニューの定義開始
    MenuBegin,

    // メインメニューのボタン
    MenuButton,

    // メインメニューの定義終了
    MenuEnd,

    // ボタンイベント開始
    EventBegin,

    // ボタンイベント終了
    EventEnd,

    // 条件開始
    If,

    // 条件のelse
    Else,

    // 条件終了
    EndIf,

    // 残高画面
    ShowBalance,

    // 預金画面
    ShowDeposit,

    // 引き出し画面
    ShowWithdraw,

    // チャージ画面
    ShowCharge,

    // 現在のイベントを終了して呼び出し元へ戻る
    Return
}

/**
 * ScriptAPI側で評価する条件
 */
//% blockHidden=true
enum AtmCondition {

    // エメラルドを持っている
    HasEmerald,

    // キャッシュカードを持っている
    HasCashCard,

    // 残高が十分
    HasEnoughBalance
}


/**
 * 現在構築中のATMプログラム
 *
 * JSONなどは使用せず、単純な数値配列として保持する。
 */
let atmProgram: number[] = [];


/**
 * 命令を追加する
 */
function emit(opcode: AtmOpcode): void {

    atmProgram.push(opcode);
}


/**
 * 命令＋引数を追加する
 */
function emitArg(opcode: AtmOpcode, argument: number): void {

    atmProgram.push(opcode);
    atmProgram.push(argument);
}


/**
 * 数値配列をコマンド文字列へ変換する
 *
 * 例：
 *
 * [0, 2, 0, 3, 1]
 *
 * ↓
 *
 * "0,2,0,3,1"
 */
function serializeProgram(): string {

    let result = "";

    for (let i = 0; i < atmProgram.length; i++) {

        if (i > 0) {
            result += ",";
        }

        result += atmProgram[i];
    }

    return result;
}


/**
 * Custom blocks
 */
//% weight=100 color=#fab005 icon=""
namespace atm {

    /**
     * ATMプログラムを作成してScriptAPIへ送信する。
     *
     * MakeCode上では、
     *
     * ATMプログラム
     *   ├ ATMを起動
     *   ├ メニュー
     *   ├ イベント
     *   └ ATMを終了
     *
     * のように使用する。
     *
     * @param body ATMプログラム
     */
    //% block="ATMプログラム"
    export function program(body: () => void): void {

        // 前回のプログラムを破棄
        atmProgram = [];

        // プログラムを構築
        body();

        // 何も登録されていなければ送信しない
        if (atmProgram.length == 0) {
            return;
        }

        // 数値命令列を1回のカスタムコマンドで送信
        //
        // 例：
        // atm program 0,2,3,0,3,1,4,1,0,...
        player.execute(
            "atm program " + serializeProgram()
        );
    }


    //==================================================
    // ATM
    //==================================================

    /**
     * ATMを起動させる
     */
    //% block="ATMを起動させる"
    export function runAtm(): void {

        emit(AtmOpcode.Run);
    }


    /**
     * ATMを終了させる
     */
    //% block="ATMを終了させる"
    export function endAtm(): void {

        emit(AtmOpcode.End);
    }


    //==================================================
    // Menu
    //==================================================

    /**
     * メインメニューの定義を開始する。
     *
     * この間に showMenu() を呼び出すことで、
     * メインメニューに表示するボタンを指定する。
     *
     * 例：
     *
     * メニュー開始
     *   残高確認
     *   預金
     *   引き出し
     * メニュー終了
     */
    //% block="メインメニューを開始"
    export function beginMenu(): void {

        emit(AtmOpcode.MenuBegin);
    }


    /**
     * メインメニューに表示するボタンを指定する。
     *
     * ここで指定したメニュー情報は、
     * 「メインメニュー」というFlowの1階層下の情報として
     * ScriptAPIへ送信される。
     *
     * 例：
     *
     * showMenu(Balance)
     * showMenu(Deposit)
     *
     * ↓
     *
     * MENU_BEGIN
     * BUTTON Balance
     * BUTTON Deposit
     * MENU_END
     */
    //% block="メニュー $menu を表示する"
    export function showMenu(menu: AtmMenu): void {

        emitArg(
            AtmOpcode.MenuButton,
            menu
        );
    }


    /**
     * メインメニューの定義を終了する。
     */
    //% block="メインメニューを終了"
    export function endMenu(): void {

        emit(AtmOpcode.MenuEnd);
    }


    //==================================================
    // Events
    //==================================================

    /**
     * 残高確認ボタンを押したとき
     *
     * ScriptAPI側では、実際にボタンが押されたときに
     * このイベントの中身を実行する。
     */
    //% block="残高確認ボタンを押したとき"
    export function onPushBalance(body: () => void): void {

        emitArg(
            AtmOpcode.EventBegin,
            AtmMenu.Balance
        );

        body();

        emit(AtmOpcode.EventEnd);
    }


    /**
     * 預金ボタンを押したとき
     */
    //% block="預金ボタンを押したとき"
    export function onPushDeposit(body: () => void): void {

        emitArg(
            AtmOpcode.EventBegin,
            AtmMenu.Deposit
        );

        body();

        emit(AtmOpcode.EventEnd);
    }


    /**
     * 引き出しボタンを押したとき
     */
    //% block="引き出しボタンを押したとき"
    export function onPushWithdraw(body: () => void): void {

        emitArg(
            AtmOpcode.EventBegin,
            AtmMenu.Withdraw
        );

        body();

        emit(AtmOpcode.EventEnd);
    }


    /**
     * チャージボタンを押したとき
     */
    //% block="チャージボタンを押したとき"
    export function onPushCharge(body: () => void): void {

        emitArg(
            AtmOpcode.EventBegin,
            AtmMenu.Charge
        );

        body();

        emit(AtmOpcode.EventEnd);
    }


    //==================================================
    // Conditions
    //==================================================

    /**
     * エメラルドを持っているかどうか。
     *
     * この関数自身は条件を判定しない。
     *
     * ScriptAPI側で、
     *
     *   プレイヤーのインベントリ
     *
     * を確認する。
     *
     * booleanのtrueは、MakeCode上で
     *
     *   もし「エメラルドを持っている」
     *
     * のような条件ブロックとして使用するためのもの。
     */
    //% block="エメラルドを持っている"
    export function hasEmerald(): boolean {

        emitArg(
            AtmOpcode.If,
            AtmCondition.HasEmerald
        );

        // 実際の条件判定はScriptAPI側。
        return true;
    }


    /**
     * キャッシュカードを持っているかどうか。
     */
    //% block="キャッシュカードを持っている"
    export function hasCashCard(): boolean {

        emitArg(
            AtmOpcode.If,
            AtmCondition.HasCashCard
        );

        return true;
    }


    /**
     * 残高が十分かどうか。
     */
    //% block="残高が十分"
    export function hasEnoughBalance(): boolean {

        emitArg(
            AtmOpcode.If,
            AtmCondition.HasEnoughBalance
        );

        return true;
    }


    /**
     * 条件のelse側。
     */
    //% block="そうでなければ"
    export function elseCondition(): void {

        emit(AtmOpcode.Else);
    }


    /**
     * 条件を終了する。
     */
    //% block="条件を終了"
    export function endIf(): void {

        emit(AtmOpcode.EndIf);
    }


    //==================================================
    // Screens
    //==================================================

    /**
     * 残高画面を表示する。
     */
    //% block="残高画面を表示する"
    export function showBalance(): void {

        emit(AtmOpcode.ShowBalance);
    }


    /**
     * 預金画面を表示する。
     */
    //% block="預金画面を表示する"
    export function showDeposit(): void {

        emit(AtmOpcode.ShowDeposit);
    }


    /**
     * 引き出し画面を表示する。
     */
    //% block="引き出し画面を表示する"
    export function showWithdraw(): void {

        emit(AtmOpcode.ShowWithdraw);
    }


    /**
     * チャージ画面を表示する。
     */
    //% block="チャージ画面を表示する"
    export function showCharge(): void {

        emit(AtmOpcode.ShowCharge);
    }


    //==================================================
    // Flow
    //==================================================

    /**
     * 現在のイベント処理を終了して、
     * 呼び出し元のFlowへ戻る。
     *
     * 例えば
     *
     * 残高確認ボタンを押したとき
     *   残高画面
     *   戻る
     *
     * とした場合、
     *
     * EVENT_BEGIN Balance
     * SHOW_BALANCE
     * RETURN
     * EVENT_END
     *
     * という命令になる。
     */
    //% block="元の画面に戻る"
    export function returnToPrevious(): void {

        emit(AtmOpcode.Return);
    }
}