# ATMのメイン画面をプログラミングしてみよう！

```blocks
atm_program.program(function () {
    atm_program.showMainMenu(function () {
        atm_program.addButton(AtmButton.Balance)
        atm_program.addButton(AtmButton.Deposit)
        atm_program.addButton(AtmButton.Withdraw)
        atm_program.addButton(AtmButton.Charge)
    })
})

```

## プログラミングでATMのメイン画面を作ろう！
メイン画面とは、ATMを開いたときに始めに表示される画面のことです。
ATMの各機能の画面に進むためのボタンを表示させましょう！

## メイン画面の仕組みを作るプログラム @showhint
メイン画面は、**ヒント**の画像のようにボタンが並んでいます。
ヒントは💡ボタンを押すと見ることができます。
どのようにプログラムすれば良いか考えてみましょう！

![mission1_hint](https://raw.githubusercontent.com/V-code-japan/atm_algorithm_programming/master/docs/static/mission1_hint.png)

## できたか試してみよう！
プログラミングが出来上がったら、**右下の▶ボタン**を押してプログラムを実行しましょう。
ボタンを押してゲーム画面に戻ったら、**ATMを右クリック**して開いて、プログラムした通りにメニュー画面ができているか確認しましょう！

できているのを確認したら、**NPCを右クリック**して、「できた！」と伝えましょう！


