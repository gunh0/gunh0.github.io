---
layout: post
title: "Understanding the Reduced Residue System: Foundation of RSA and Modern Cryptography"
date: 2025-11-16 00:00:00 +0900
tags: [cryptography, number-theory, modular-arithmetic, rsa, euler-totient]
description: "Learn about the reduced residue system and why it's essential for RSA encryption, Euler's theorem, and multiplicative groups in cryptography"
usemathjax: true
---

In modular arithmetic, we often work with the complete residue system $\mathbb{Z}_n = \{0, 1, 2, \dots, n-1\}$. However, many cryptographic operations — especially those involving multiplicative inverses, modular exponentiation, RSA, and Euler's theorem — require a more specialized subset of values: the **Reduced Residue System**, denoted as $\mathbb{Z}_n^*$.

This concept is essential for understanding the structure of numbers modulo $n$, and it forms the mathematical foundation for public-key cryptography.

<br/>

## 1. What Is the Reduced Residue System?

The reduced residue system modulo $n$ consists of all integers less than $n$ that are **coprime** (i.e., relatively prime) to $n$.

Formally:

$$\mathbb{Z}_n^* = \{\, a \in \mathbb{Z}_n \mid \gcd(a, n) = 1 \,\}$$

In words:

- Start from the complete residue set $\{0, 1, \ldots, n-1\}$
- Keep only the numbers that share no common factor with $n$ except 1
- The result is the reduced residue system $\mathbb{Z}_n^*$

<br/>

## 2. Example: Reduced Residue System Modulo 8

The complete residue system modulo 8 is:

$$\mathbb{Z}_8 = \{0, 1, 2, 3, 4, 5, 6, 7\}$$

Among these, we select the integers that are coprime with 8.

Compute:

- $\gcd(1, 8) = 1$ → keep
- $\gcd(2, 8) = 2$ → discard
- $\gcd(3, 8) = 1$ → keep
- $\gcd(4, 8) = 4$ → discard
- $\gcd(5, 8) = 1$ → keep
- $\gcd(6, 8) = 2$ → discard
- $\gcd(7, 8) = 1$ → keep

Thus:

$$\mathbb{Z}_8^* = \{1, 3, 5, 7\}$$

Only four numbers remain — exactly the numbers that have multiplicative inverses modulo 8.

<br/>

## 3. Why Reduced Residue Systems Matter in Cryptography

The set $\mathbb{Z}_n^*$ has several extremely important properties that are used throughout cryptographic algorithms:

### 3.1 It forms a multiplicative group

The elements of $\mathbb{Z}_n^*$ satisfy:

- Closure under multiplication mod $n$
- Every element has a multiplicative inverse
- They follow associativity and contain identity

So, $(\mathbb{Z}_n^*)^\times$ forms a group, which is essential for:

- RSA
- Diffie–Hellman
- ElGamal
- Euler's Totient Theorem
- Discrete logarithm problems

### 3.2 Euler's Totient Function is defined using $\mathbb{Z}_n^*$

The size of the reduced residue system is:

$$|\mathbb{Z}_n^*| = \varphi(n)$$

where $\varphi(n)$ is Euler's totient function — a core building block of RSA key generation and modular arithmetic theory.

Example:

$$\varphi(8) = 4 \quad \text{because } \mathbb{Z}_8^* = \{1, 3, 5, 7\}$$

### 3.3 Modular inverses exist only within this set

If $a \notin \mathbb{Z}_n^*$, then $a$ does not have a multiplicative inverse modulo $n$.

This is why RSA encryption and decryption require working inside $\mathbb{Z}_n^*$ — the math only works if every element is invertible.

<br/>

## 4. More Examples

### Modulo 10

$$\mathbb{Z}_{10} = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$$

Compute gcd with 10:

- Coprime numbers: $\{1, 3, 7, 9\}$

$$\mathbb{Z}_{10}^* = \{1, 3, 7, 9\}$$

### Modulo a prime number $p$

If $n = p$ (prime):

$$\mathbb{Z}_p^* = \{1, 2, \dots, p-1\}$$

All non-zero residues modulo a prime are automatically coprime with $p$. This is a key reason primes are so powerful in cryptography.

<br/>

## 5. Summary

- A reduced residue system $\mathbb{Z}_n^*$ contains all integers less than $n$ that are coprime with $n$.
- It is a fundamental structure in number theory and cryptography.
- Its size equals Euler's totient function $\varphi(n)$.
- It forms a multiplicative group, enabling digital signatures, encryption, and key exchange protocols.
- Only elements in $\mathbb{Z}_n^*$ have modular inverses — critical for RSA and similar systems.

Understanding the reduced residue system is essential for anyone working with modern cryptographic algorithms. It provides the mathematical foundation that makes secure communication possible in the digital age.
