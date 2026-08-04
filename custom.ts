
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

enum AtmFlow {
    Run,
    ShowMain,
    ShowBalance,
    ShowDeposit,
    ShowWithdraw,
    ShowCharge,
    End,
}

const flow: AtmFlow[] = [];

/**
 * Custom blocks
 */
//% weight=100 color=#fab005 icon=""
namespace atm {

    //% block="ATMプログラム"
    export function sendAtmFlow(body: () => void): void {
        body();

        if (flow.length !== 0) {
            flow.forEach(f => {
                player.execute(`atm flow ${f}`);
            });
        }
    };

    //% block="ATMを起動させる"
    export function runAtm(): void {
        flow.push(AtmFlow.Run);
    }

    //% block="ATMを終了させる"
    export function endAtm(): void {
        flow.push(AtmFlow.End);
    }

    //% block="メニュー $menu を表示する"
    export function showMenu(menu: AtmMenu): void {
        player.execute(`atm show ${menu}`);
    }

    //% block="残高確認ボタンを押したとき"
    export function onPushBalance(ev: () => void): void {

    }

    //% block="エメラルドを持っている"
    export function hasEmerald(): boolean {
        
        return true;
    }
}
