package com.example.cotcalc

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var tv: TextView

    private var acc: Double? = null
    private var pendingOp: Int? = null // 1 add,2 sub,3 mul,4 div
    private var input: String = "0"
    private var justEvaluated = false

    external fun nativeCalc(a: Double, b: Double, op: Int): Double

    companion object {
        init {
            System.loadLibrary("nativecalc")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tv = findViewById(R.id.tvDisplay)
        render()

        // 숫자 버튼
        val digitIds = listOf(
            R.id.btn0, R.id.btn1, R.id.btn2, R.id.btn3, R.id.btn4,
            R.id.btn5, R.id.btn6, R.id.btn7, R.id.btn8, R.id.btn9
        )
        digitIds.forEachIndexed { digit, id ->
            findViewById<Button>(id).setOnClickListener { onDigit(digit) }
        }

        findViewById<Button>(R.id.btnDot).setOnClickListener { onDot() }
        findViewById<Button>(R.id.btnClear).setOnClickListener { onClear() }

        findViewById<Button>(R.id.btnAdd).setOnClickListener { onOp(1) }
        findViewById<Button>(R.id.btnSub).setOnClickListener { onOp(2) }
        findViewById<Button>(R.id.btnMul).setOnClickListener { onOp(3) }
        findViewById<Button>(R.id.btnDiv).setOnClickListener { onOp(4) }

        findViewById<Button>(R.id.btnEq).setOnClickListener { onEqual() }
    }

    private fun onDigit(d: Int) {
        if (justEvaluated) {
            input = "0"
            acc = null
            pendingOp = null
            justEvaluated = false
        }
        input = if (input == "0") d.toString() else input + d.toString()
        render()
    }

    private fun onDot() {
        if (justEvaluated) {
            input = "0"
            acc = null
            pendingOp = null
            justEvaluated = false
        }
        if (!input.contains(".")) {
            input += "."
            render()
        }
    }

    private fun onClear() {
        acc = null
        pendingOp = null
        input = "0"
        justEvaluated = false
        render()
    }

    private fun onOp(op: Int) {
        val b = input.toDoubleOrNull() ?: 0.0

        if (acc == null) {
            acc = b
        } else if (pendingOp != null) {
            acc = applyNative(acc!!, b, pendingOp!!)
        }

        pendingOp = op
        input = "0"
        justEvaluated = false
        render(accValue = acc)
    }

    private fun onEqual() {
        val b = input.toDoubleOrNull() ?: 0.0
        if (acc != null && pendingOp != null) {
            val result = applyNative(acc!!, b, pendingOp!!)
            acc = result
            input = format(result)
            pendingOp = null
            justEvaluated = true
            render()
        } else {
            justEvaluated = true
            render()
        }
    }

    private fun applyNative(a: Double, b: Double, op: Int): Double {
        if (op == 4 && b == 0.0) {
            // 0으로 나눔
            tv.text = "Error"
            acc = null
            pendingOp = null
            input = "0"
            justEvaluated = false
            return 0.0
        }
        return nativeCalc(a, b, op)
    }

    private fun render(accValue: Double? = null) {
        if (tv.text == "Error") return
        tv.text = when {
            accValue != null && input == "0" && pendingOp != null -> format(accValue)
            else -> input
        }
    }

    private fun format(v: Double): String {
        val s = v.toString()
        return if (s.endsWith(".0")) s.dropLast(2) else s
    }
}
