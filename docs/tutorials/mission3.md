# 全体の機能をプログラミングしてみよう！

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

## 残りの画面も作ろう！
残高確認画面が開けるようになったので、**預金画面**、**引き出し画面**、**チャージ画面**も開けるようにプログラミングしていきましょう！

## 各画面の仕組みを作るプログラム
各画面は、次のような条件で開けるようにしましょう。

1. 預金画面: キャッシュカードを持っていて、エメラルドを持っているなら表示⇒メインメニューに戻る　持っていないなら「エメラルドを持っていません」とエラー画面を表示⇒メインメニューに戻る
2. 引き出し画面: キャッシュカードを持っていて、残高があるなら表示⇒メインメニューに戻る　残高がないなら「残高がありません」とエラー画面を表示⇒メインメニューに戻る
2. チャージ画面: **キャッシュレスカード**を持っていて、残高があるなら表示⇒メインメニューに戻る　残高がないなら「残高がありません」とエラー画面を表示⇒メインメニューに戻る

## できたか試してみよう！
プログラミングが出来上がったら、**右下の▶ボタン**を押してプログラムを実行しましょう。
ボタンを押してゲーム画面に戻ったら、**ATMを右クリック**して開いて、プログラムした通りに動くか、実際にエメラルドを預けたり引き出したりして確認しましょう！

できているのを確認したら、**NPCを右クリック**して、「できた！」と伝えましょう！

