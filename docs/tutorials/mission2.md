# 残高確認画面をプログラミングしてみよう！

```blocks
atm_program.program(function () {
    atm_program.showMainMenu(function () {
        atm_program.addButton(AtmButton.Balance)
        atm_program.addButton(AtmButton.Deposit)
        atm_program.addButton(AtmButton.Withdraw)
        atm_program.addButton(AtmButton.Charge)
    })
})
atm_program.onPush(AtmButton.Balance, function () {
    atm_condition.customIf(atm_condition.condition(AtmCondition.HasCashCard), function () {
        atm_program.show(AtmMenu.Balance)
        atm_program.returnMenu()
    })
    atm_program.showError(AtmError.NoCashCard)
    atm_program.returnMenu()
})
```

```template
atm_program.program(function () {
    atm_program.showMainMenu(function () {
        atm_program.addButton(AtmButton.Balance)
        atm_program.addButton(AtmButton.Deposit)
        atm_program.addButton(AtmButton.Withdraw)
        atm_program.addButton(AtmButton.Charge)
    })
})
```

## プログラミングで残高確認画面を作ろう！
メイン画面が開くようになったので、メイン画面の「残高確認ボタン」を押したときに、残高確認画面が開くようにプログラミングしましょう！

## 残高確認画面の仕組みを作るプログラム
残高確認画面を見るためには、**キャッシュカードを持っている**必要があります。

``||ATM条件分岐||``にある``||atm_condition.もし～なら||``を使って、
1. キャッシュカードを持っているなら残高確認画面を表示⇒メインメニューに戻る
2. キャッシュカードを持っていないなら「キャッシュカードがありません」とエラー画面を表示⇒メインメニューに戻る

となるようにプログラミングしましょう！


## できたか試してみよう！
プログラミングが出来上がったら、**右下の▶ボタン**を押してプログラムを実行しましょう。
ボタンを押してゲーム画面に戻ったら、**ATMを右クリック**して開いて、プログラムした通りに残高表示画面を出すことがができるか確認しましょう！

できているのを確認したら、**NPCを右クリック**して、「できた！」と伝えましょう！

