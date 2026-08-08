/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：
 * https://minecraft.makecode.com/blocks/custom
 */


/**
 * ============================================================
 * ATM メニュー
 * ============================================================
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
 * ============================================================
 * ATM 条件
 * ============================================================
 */

enum AtmCondition {
    //% block="エメラルドを持っている"
    HasEmerald,

    //% block="エメラルドを持っていない"
    NotHasEmerald,

    //% block="キャッシュカードを持っている"
    HasCashCard,

    //% block="キャッシュカードを持っていない"
    NotHasCashCard,

    //% block="残高がある"
    HasBalance,

    //% block="残高がない"
    NotHasBalance,
}


/**
 * ============================================================
 * DSL Builder
 * ============================================================
 */

let atmFlow: string[] = [];

/**
 * 現在のDSL階層
 *
 * 0:
 * RUN
 *
 * 1:
 * >SHOW:BALANCE
 *
 * 2:
 * >>SHOW:DEPOSIT
 */
let atmDepth = 0;


/**
 * DSL命令を追加
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
 * ============================================================
 * Custom Blocks
 * ============================================================
 */

//% weight=100 color=#fab005 icon=""
//% block="ATMプログラム"
namespace atm_program {


    /**
     * ========================================================
     * ATM PROGRAM
     * ========================================================
     */

    /**
     * ATMプログラム
     *
     * このブロックの中に置かれたブロックが
     * ATMプログラム本体になる。
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
     * ========================================================
     * BASIC
     * ========================================================
     */

    /**
     * ATMを起動
     */
    //% block="ATMを起動させる"
    export function runAtm(): void {

        emit("RUN");
    }


    /**
     * ATMを終了
     */
    //% block="ATMを終了させる"
    export function endAtm(): void {

        emit("END");
    }


    /**
     * ========================================================
     * MAIN MENU
     * ========================================================
     */

    /**
     * メインメニューを表示
     *
     * このブロックの中に置かれた
     * 「メニューに表示するボタン」を
     * メニューの内容として扱う。
     */
    //% block="メインメニューを表示"
    //% handlerStatement=true
    export function showMainMenu(body: () => void): void {

        emit("MENU");

        pushDepth();

        body();

        popDepth();

        emit("MENU_END");
    }


    /**
     * メニューに残高確認ボタンを追加
     */
    //% block="残高確認ボタン"
    export function balanceButton(): void {

        emit("BUTTON:BALANCE");
    }


    /**
     * メニューに預金ボタンを追加
     */
    //% block="預金ボタン"
    export function depositButton(): void {

        emit("BUTTON:DEPOSIT");
    }


    /**
     * メニューに引き出しボタンを追加
     */
    //% block="引き出しボタン"
    export function withdrawButton(): void {

        emit("BUTTON:WITHDRAW");
    }


    /**
     * メニューにチャージボタンを追加
     */
    //% block="チャージボタン"
    export function chargeButton(): void {

        emit("BUTTON:CHARGE");
    }


    /**
     * ========================================================
     * EVENT HANDLER
     * ========================================================
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
     * ========================================================
     * SCREEN
     * ========================================================
     */

    /**
     * 残高画面を表示
     */
    //% block="残高画面を表示"
    export function showBalance(): void {

        emit("SHOW:BALANCE");
    }


    /**
     * 預金画面を表示
     */
    //% block="預金画面を表示"
    export function showDeposit(): void {

        emit("SHOW:DEPOSIT");
    }


    /**
     * 引き出し画面を表示
     */
    //% block="引き出し画面を表示"
    export function showWithdraw(): void {

        emit("SHOW:WITHDRAW");
    }


    /**
     * チャージ画面を表示
     */
    //% block="チャージ画面を表示"
    export function showCharge(): void {

        emit("SHOW:CHARGE");
    }


    /**
     * エラー画面を表示
     */
    //% block="エラー画面を表示"
    export function showError(): void {

        emit("SHOW:ERROR");
    }


    /**
     * メニューに戻る
     */
    //% block="メニューに戻る"
    export function returnMenu(): void {

        emit("RETURN");
    }

}

    /**
     * ========================================================
     * CONDITION
     * ========================================================
     */

//% weight=100 color=#fab005 icon=""
//% block="ATM条件分岐"
namespace atm_condition {

    /**
     * エメラルドを持っている
     *
     * 実際の判定はScriptAPI側で行う。
     *
     * MakeCode側では
     *
     * IF:HAS_EMERALD
     *
     * を生成する。
     */
    //% block="エメラルドを持っている"
    export function hasEmerald(): boolean {

        emit("IF:HAS_EMERALD");

        return true;
    }


    /**
     * キャッシュカードを持っている
     */
    //% block="キャッシュカードを持っている"
    export function hasCashCard(): boolean {

        emit("IF:HAS_CASH_CARD");

        return true;
    }


    /**
     * 残高がある
     */
    //% block="残高がある"
    export function hasBalance(): boolean {

        emit("IF:HAS_BALANCE");

        return true;
    }


    /**
     * ========================================================
     * IF / ELSE
     * ========================================================
     */

    /**
     * 通常のMakeCodeの
     *
     * 「もし ～ なら
     *       ○○
     *  でなければ
     *       ○○」
     *
     * と同じ構造を作る。
     *
     * conditionが評価された時点で
     * hasEmerald()などがIF命令を生成しているため、
     * この関数では実際のboolean値は使用しない。
     */
    //% block="もし $condition なら || でなければ"
    //% handlerStatement=1
    //% expandableArgument=1
    export function customIf(
        condition: boolean,
        thenHandler: () => void,
    ): void {
        pushDepth();
        thenHandler();
        popDepth();
    }
}