---
layout: post
title:  "Calculating Modular Exponents with Euclidean Algorithm"
date:   2024-08-24 00:00:00 +0900
tags: [cryptography, number-theory, modular-arithmetic, euclidean-algorithm, modular-exponentiation]
description: "Learn how to calculate large exponents modulo a prime number using the Extended Euclidean Algorithm and modular arithmetic."
usemathjax: true
---

In the world of cryptography, modular arithmetic is an essential tool, especially when dealing with large exponents. One classic problem you might encounter is calculating a large exponentiation modulo a prime number, such as finding $5^{101} \mod 17$. Although this can be computed directly, using the Extended Euclidean Algorithm allows us to understand and verify the steps in a cryptographically sound manner.

### Step 1: Understanding Modular Arithmetic

Modular arithmetic is the backbone of many cryptographic algorithms. In simple terms, $a \mod n$ gives the remainder when $a$ is divided by $n$. For instance, $10 \mod 3$ is 1 because 10 divided by 3 leaves a remainder of 1.

### Step 2: Simplifying the Exponent

Calculating $5^{101} \mod 17$ directly would be computationally intensive. Instead, we can simplify the exponent using properties of modular arithmetic.

**Fermat's Little Theorem** states that if $p$ is a prime number and $a$ is an integer not divisible by $p$, then:

$$a^{p-1} \equiv 1 \mod p$$

For $a = 5$ and $p = 17$, we have:

$$5^{16} \equiv 1 \mod 17$$

This simplifies $5^{101} \mod 17$ as:

$$
\begin{aligned}
5^{101} &= 5^{16 \cdot 6 + 5} \\
        &= (5^{16})^6 \cdot 5^5 \\
        &\equiv 1^6 \cdot 5^5 \mod 17 \\
        &\equiv 5^5 \mod 17
\end{aligned}
$$

Now, our task reduces to finding $5^5 \mod 17$.

### Step 3: Calculating $5^5 \mod 17$

We calculate $5^5$ as:

$$
\begin{aligned}
5^2 &= 25 \equiv 8 \mod 17 \\
5^4 &= 8^2 = 64 \equiv 13 \mod 17 \\
5^5 &= 5 \cdot 5^4 = 5 \cdot 13 = 65 \equiv 14 \mod 17
\end{aligned}
$$

Thus, $5^5 \equiv 14 \mod 17$.

### Step 4: Verification Using Extended Euclidean Algorithm

To ensure the accuracy of the result, we can use the Extended Euclidean Algorithm to find the modular inverse if necessary. However, in this case, since our calculations show that $5^{101} \equiv 14 \mod 17$, we have verified the calculation without the need for further steps.

### Conclusion

The result of $5^{101} \mod 17$ is $\boxed{14}$. This demonstrates how the combination of modular arithmetic and number theory principles, such as Fermat's Little Theorem, simplifies calculations in cryptographic applications.

Understanding these principles is crucial for designing secure systems, as they underpin many cryptographic protocols in use today. For further reading, consider exploring how these techniques apply in RSA encryption and other cryptographic algorithms.
