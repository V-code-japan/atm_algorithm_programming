/**
 * ATMメニュー
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
 * ATMの条件
 */
//% blockHidden=true
enum AtmCondition {
    //% block="エメラルドを持っている"
    HasEmerald,

    //% block="キャッシュカードを持っている"
    HasCashCard,

    //% block="残高がある"
    HasBalance
}


/**
 * 現在作成中のATMプログラム
 */
let atmFlow: string[] = [];


/**
 * 現在の階層
 *
 * 0 = 最上位
 * 1 = 1階層下
 * 2 = 2階層下
 */
let atmDepth = 0;


/**
 * DSL命令を追加する
 *
 * 例：
 *
 * depth = 0
 * emit("RUN")
 *
 * ↓
 *
 * RUN
 *
 *
 * depth = 1
 * emit("SHOW:BALANCE")
 *
 * ↓
 *
 * >SHOW:BALANCE
 */
function emit(command: string): void {

    let prefix = "";

    for (let i = 0; i < atmDepth; i++) {
        prefix += ">";
    }

    atmFlow.push(prefix + command);
}


/**
 * 階層を1つ下げる
 */
function pushDepth(): void {

    atmDepth++;
}


/**
 * 階層を1つ上げる
 */
function popDepth(): void {

    if (atmDepth > 0) {
        atmDepth--;
    }
}


/**
 * ATM Custom Blocks
 */
//% weight=100 color=#fab005 icon=""
namespace atm {

    /**
     * ============================================================
     * ATM PROGRAM
     * ============================================================
     */

    /**
     * ATMプログラム
     */
    //% block="ATMプログラム"
    export function program(body: () => void): void {

        atmFlow = [];
        atmDepth = 0;

        body();

        if (atmFlow.length > 0) {

            player.execute(
                "atm program " + atmFlow.join("|")
            );
        }

        atmFlow = [];
        atmDepth = 0;
    }


    /**
     * ============================================================
     * BASIC
     * ============================================================
     */

    /**
     * ATMを起動させる
     */
    //% block="ATMを起動させる"
    export function runAtm(): void {

        emit("RUN");
    }


    /**
     * ATMを終了させる
     */
    //% block="ATMを終了させる"
    export function endAtm(): void {

        emit("END");
    }


    /**
     * ============================================================
     * MENU
     * ============================================================
     */

    /**
     * メインメニューを表示する
     *
     * このブロック自体は
     *
     * MENU
     *
     * を生成し、
     * 内側に配置されたブロックを
     * 1階層下として扱う。
     */
    //% block="メインメニューを表示"
    export function showMainMenu(body: () => void): void {

        emit("MENU");

        pushDepth();

        body();

        popDepth();

        emit("MENU_END");
    }


    /**
     * メニューにボタンを追加する
     */
    //% block="メニューに $menu ボタンを追加"
    export function addMenuButton(menu: AtmMenu): void {

        switch (menu) {

            case AtmMenu.Balance:
                emit("BUTTON:BALANCE");
                break;

            case AtmMenu.Deposit:
                emit("BUTTON:DEPOSIT");
                break;

            case AtmMenu.Withdraw:
                emit("BUTTON:WITHDRAW");
                break;

            case AtmMenu.Charge:
                emit("BUTTON:CHARGE");
                break;
        }
    }


    /**
     * ============================================================
     * EVENTS
     * ============================================================
     */

    /**
     * 残高確認ボタンを押したとき
     */
    //% block="残高確認ボタンを押したとき"
    export function onPushBalance(body: () => void): void {

        emit("EVENT:BALANCE");

        pushDepth();

        body();

        popDepth();

        emit("EVENT_END");
    }


    /**
     * 預金ボタンを押したとき
     */
    //% block="預金ボタンを押したとき"
    export function onPushDeposit(body: () => void): void {

        emit("EVENT:DEPOSIT");

        pushDepth();

        body();

        popDepth();

        emit("EVENT_END");
    }


    /**
     * 引き出しボタンを押したとき
     */
    //% block="引き出しボタンを押したとき"
    export function onPushWithdraw(body: () => void): void {

        emit("EVENT:WITHDRAW");

        pushDepth();

        body();

        popDepth();

        emit("EVENT_END");
    }


    /**
     * チャージボタンを押したとき
     */
    //% block="チャージボタンを押したとき"
    export function onPushCharge(body: () => void): void {

        emit("EVENT:CHARGE");

        pushDepth();

        body();

        popDepth();

        emit("EVENT_END");
    }


    /**
     * ============================================================
     * SCREEN
     * ============================================================
     */

    /**
     * 残高画面を表示する
     */
    //% block="残高画面を表示"
    export function showBalance(): void {

        emit("SHOW:BALANCE");
    }


    /**
     * 預金画面を表示する
     */
    //% block="預金画面を表示"
    export function showDeposit(): void {

        emit("SHOW:DEPOSIT");
    }


    /**
     * 引き出し画面を表示する
     */
    //% block="引き出し画面を表示"
    export function showWithdraw(): void {

        emit("SHOW:WITHDRAW");
    }


    /**
     * チャージ画面を表示する
     */
    //% block="チャージ画面を表示"
    export function showCharge(): void {

        emit("SHOW:CHARGE");
    }


    /**
     * エラー画面を表示する
     */
    //% block="エラー画面を表示"
    export function showError(): void {

        emit("SHOW:ERROR");
    }


    /**
     * ============================================================
     * FLOW
     * ============================================================
     */

    /**
     * メニューに戻る
     */
    //% block="メニューに戻る"
    export function returnMenu(): void {

        emit("RETURN");
    }


    /**
     * ============================================================
     * CONDITION
     * ============================================================
     */

    /**
     * エメラルドを持っている
     *
     * 戻り値はMakeCode上で
     *
     * if (atm.hasEmerald()) {
     *
     * のような条件ブロックとして使用するためのもの。
     *
     * 実際の条件判定はScriptAPI側で行う。
     */
    //% block="エメラルドを持っている"
    export function hasEmerald(): boolean {

        emit("IF:HAS_EMERALD");

        pushDepth();

        return true;
    }


    /**
     * キャッシュカードを持っている
     */
    //% block="キャッシュカードを持っている"
    export function hasCashCard(): boolean {

        emit("IF:HAS_CASH_CARD");

        pushDepth();

        return true;
    }


    /**
     * 残高がある
     */
    //% block="残高がある"
    export function hasBalance(): boolean {

        emit("IF:HAS_BALANCE");

        pushDepth();

        return true;
    }


    /**
     * ============================================================
     * IF
     * ============================================================
     */

    /**
     * ELSE
     *
     * JavaScriptのelseではなく、
     * ATM DSL上のELSEを生成する。
     */
    //% block="それ以外なら"
    export function elseCondition(): void {

        popDepth();

        emit("ELSE");

        pushDepth();
    }


    /**
     * IFを終了する
     */
    //% block="条件分岐を終了"
    export function endIf(): void {

        popDepth();

        emit("IF_END");
    }
}