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
    Charge,

    //% block="エラー"
    Error,
}

/**
 * ============================================================
 * ATM ボタン
 * ============================================================
 */
enum AtmButton {
    //% block="残高確認"
    Balance,

    //% block="預金"
    Deposit,

    //% block="引き出し"
    Withdraw,

    //% block="チャージ"
    Charge,
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
 * enumに対応する命令文を返す
 */
function getConditionString(condition: AtmCondition): string {

    switch (condition) {

        case AtmCondition.HasEmerald:
            return "HAS_EMERALD";

        case AtmCondition.NotHasEmerald:
            return "NOT_HAS_EMERALD";

        case AtmCondition.HasCashCard:
            return "HAS_CASH_CARD";

        case AtmCondition.NotHasCashCard:
            return "NOT_HAS_CASH_CARD";

        case AtmCondition.HasBalance:
            return "HAS_BALANCE";

        case AtmCondition.NotHasBalance:
            return "NOT_HAS_BALANCE";
    }

    return "";
}

/**
 * ATMメニューをDSL文字列に変換する
 */
function getAtmMenuString(menu: AtmMenu): string {

    switch (menu) {

        case AtmMenu.Balance:
            return "BALANCE";

        case AtmMenu.Deposit:
            return "DEPOSIT";

        case AtmMenu.Withdraw:
            return "WITHDRAW";

        case AtmMenu.Charge:
            return "CHARGE";
        
        case AtmMenu.Error:
            return "ERROR";
    }

    return "";
}

/**
 * ATMボタンをDSL文字列に変換する
 */
function getAtmButtonString(button: AtmButton): string {

    switch (button) {

        case AtmButton.Balance:
            return "BALANCE";

        case AtmButton.Deposit:
            return "DEPOSIT";

        case AtmButton.Withdraw:
            return "WITHDRAW";

        case AtmButton.Charge:
            return "CHARGE";
    }

    return "";
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
    //% group="全体の制御"
    //% weight = 10
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
    //% group="全体の制御"
    //% weight=9
    //% block="ATMを起動させる"
    export function runAtm(): void {

        emit("RUN");
    }


    /**
     * ATMを終了
     */
    //% group="全体の制御"
    //% weight=8
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
    //% group="メインメニュー"
    //% weight=10
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
     * メニューにボタンを追加する
     */
    //% group="メインメニュー"
    //% weight=9
    //% block="ボタン: $atmButton を追加する"
    export function addButton(atmButton: AtmButton): void {

        emit("BUTTON:" + getAtmButtonString(atmButton));
    }



    /**
     * ========================================================
     * EVENT HANDLER
     * ========================================================
     */

    /**
     * 残高確認ボタンを押したとき
     */
    //% group="各メニュー"
    //% weight=10
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
    //% group="各メニュー"
    //% weight=9
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
    //% group="各メニュー"
    //% weight=8
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
    //% group="各メニュー"
    //% weight=7
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
     * 画面を表示する命令
     * 指定した画面のメニューを表示します。
     */

    //% group="各メニュー"
    //% weight=6
    //% block="画面: $atmMenu を表示する"
    export function show(atmMenu: AtmMenu): void {
        emit("SHOW:" + getAtmMenuString(atmMenu));
    }

    /**
     * メニューに戻る
     */
    //% group="各メニュー"
    //% weight=5
    //% block="メインメニューに戻る"
    export function returnMenu(): void {

        emit("RETURN");
    }

}

/**
 * ========================================================
 * CONDITION
 * ========================================================
 */

//% weight=90 color=#78c7a3 icon=""
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
    //% block="条件: $atmCondition"
    export function condition(atmCondition: AtmCondition): boolean {

        emit("IF:" + getConditionString(atmCondition));

        return true;
    }

    /**
     * ========================================================
     * IF / ELSE
     * ========================================================
     */

    /**
     * 「もし～なら」という条件分岐を作ります。
     */
    //% block="もし $condition なら"
    //% handlerStatement=1
    //% expandableArgument=1
    export function customIf(
        condition: boolean,
        thenHandler: () => void,
    ): void {
        pushDepth();
        thenHandler();
        popDepth();
        emit("IF_END");
    }
}