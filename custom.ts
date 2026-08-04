
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://minecraft.makecode.com/blocks/custom
*/

enum AtmMenu {
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
 * Custom blocks
 */
//% weight=100 color=#fab005 icon=""
namespace atm {
    //% block="メニュー $menu を表示する"
    export function showMenu(menu: AtmMenu): void {
        player.execute(`atm show ${menu}`);
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
