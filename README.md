# ATMの仕組みをプログラミングしてみよう！

```blocks
atm_program.program(function () {
    atm_program.runAtm()
    atm_program.showMainMenu(function () {
        atm_program.addButton(AtmButton.Balance)
        atm_program.addButton(AtmButton.Deposit)
        atm_program.addButton(AtmButton.Withdraw)
        atm_program.addButton(AtmButton.Charge)
    })
})
atm_program.onPush(AtmButton.Balance, function () {
    atm_condition.customIf(atm_condition.condition(AtmCondition.HasBalance), function () {
        atm_program.show(AtmMenu.Balance)
    })
})

```

## プログラミングで、ATMの仕組みを作ってみましょう
前回考えた**フローチャート**を元にして、プログラミングしてみましょう。

## ATMの仕組みを作るプログラム
**ATM**というところの中に、以下のブロックが入っています。
正しい仕組みになるように並べてみましょう。




