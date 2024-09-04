---
layout: post
title:  "Three Essential Security Properties of Cryptographic Hash Functions"
date:   2024-09-04 00:00:00 +0900
tags: [cryptography, hash-functions, security, preimage-resistance, collision-resistance]
description: "Learn about the three essential security properties of cryptographic hash functions: preimage resistance, second preimage resistance, and collision resistance
usemathjax: true
---

Cryptographic hash functions are fundamental components of modern cryptography, extensively used in digital signatures, integrity verification, password storage, and various security applications. For a hash function to be considered cryptographically secure, it must satisfy three essential security properties.

### 1. Preimage Resistance

Preimage resistance means that given a hash value \(h\), it should be computationally infeasible to find any message \(m\) such that \(H(m) = h\).
For example:

```plaintext
H("Hello") = d3486ae9136e7856bc42212385ea797094475802
```

Given only this hash value, it should be computationally infeasible to find the original message "Hello".

**Mathematical Implications**

For an \(n\)-bit hash value, the computational complexity of finding a preimage should be \(O(2^n)\)

- This implies that no method significantly more efficient than brute force should exist
- The property is also known as "one-way property"

<br/>

### 2. Second Preimage Resistance

Second preimage resistance means that given a message \(m_1\), it should be computationally infeasible to find a different message \(m_2\) such that \(H(m_1) = H(m_2)\).

Practical Example:

```python
# Importance in digital signatures
original_message = "Transfer $1000 to Alice"
malicious_message = "Transfer $1000 to Eve"

# If hash values are equal (second preimage found):
if hash(original_message) == hash(malicious_message):
    # Security vulnerability!
```

<br/>

### 3. Collision Resistance

Collision resistance means it should be computationally infeasible to find any two different messages \(m_1\) and \(m_2\) such that \(H(m_1) = H(m_2)\).

**Relationship Between Properties**

- Collision resistance is stronger than second preimage resistance
- If a hash function is collision-resistant, it is automatically second preimage resistant
- Due to the Birthday Paradox, collision attacks on an \(n\)-bit hash have complexity \(O(2^{n/2})\)

```python
# Example demonstrating collision resistance importance
def find_collision(hash_function):
    seen_hashes = {}
    while True:
        message = generate_random_message()
        hash_value = hash_function(message)
        if hash_value in seen_hashes:
            return message, seen_hashes[hash_value]
        seen_hashes[hash_value] = message
```

<br/>

### Real-World Attack Scenarios

1. **Preimage Attack**: An attacker tries to find a message that matches a given hash value.

```python
# Attacker's goal: Find m where H(m) = target_hash
def preimage_attack(target_hash):
    while True:
        candidate = generate_random_message()
        if hash(candidate) == target_hash:
            return candidate  # Should be computationally infeasible
```

2. **Collision Attack**: An attacker tries to find two different messages with the same hash value.

```python
# Birthday attack demonstration
def birthday_attack(hash_function, messages=2^32):
    hash_table = {}
    for i in range(messages):
        message = random_message()
        h = hash_function(message)
        if h in hash_table:
            return message, hash_table[h]
        hash_table[h] = message
```

### Mathematical Security Analysis

For an ideal cryptographic hash function with \(n\)-bit output:

- Preimage Resistance:
$$P(\text{finding preimage}) \approx \frac{t}{2^n}$$
where \(t\) is the number of attempts
- Collision Resistance:
$$P(\text{finding collision}) \approx \frac{t^2}{2^{n+1}}$$
due to birthday paradox

### Conclusion

The three security properties of cryptographic hash functions provide different protections against various attack scenarios. In practical applications, these properties work together to ensure overall system security. Modern hash functions like SHA-256 and SHA-3 are designed to satisfy all these properties, making them suitable for cryptographic applications.
