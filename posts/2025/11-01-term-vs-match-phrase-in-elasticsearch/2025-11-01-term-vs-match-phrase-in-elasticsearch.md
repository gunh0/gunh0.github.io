---
layout: post
title:  "'term' vs 'match_phrase' in Elasticsearch"
date:   2025-11-01 00:00:00 +0900
tags: [elasticsearch, search, query, database, performance]
description: "Understanding the differences between term and match_phrase queries in Elasticsearch, their use cases, and performance implications"
usemathjax: false
---

When working with Elasticsearch, choosing the right query type is crucial for both performance and accuracy. Two commonly used query types are `term` and `match_phrase`, each serving different purposes and offering distinct performance characteristics.

### Understanding the term Query

The `term` query is generally faster than the `match_phrase` query in Elasticsearch. This is because the `term` query doesn't have to analyze the text and can directly look up the exact term in the inverted index. It performs an exact match on the indexed value, making it ideal for structured data like IDs, status codes, or exact keywords.

**Key Characteristics of term Query:**

- No text analysis is performed
- Searches for exact matches
- Case-sensitive by default
- Faster execution time
- Best for structured data and keyword fields

### Understanding the match_phrase Query

The `match_phrase` query is useful when you need to find documents that contain a specific phrase rather than just a single term. This query analyzes the text and looks for the exact phrase, taking into account word order and proximity.

**Key Characteristics of match_phrase Query:**

- Performs text analysis
- Considers word order
- Checks term proximity
- Suitable for full-text search
- Slightly slower due to analysis overhead

### Usage Examples

Here is an example of how you can use the `term` query in Elasticsearch:

```json
GET /my_index/_search
{
    "query": {
        "term": {
            "field_name": "term to search for"
        }
    }
}
```

And here is an example of how you can use the `match_phrase` query in Elasticsearch:

```json
GET /my_index/_search
{
    "query": {
        "match_phrase": {
            "field_name": "phrase to search for"
        }
    }
}
```

### When to Use Each Query Type

**Use term query when:**

- Searching for exact values in keyword fields
- Querying structured data (IDs, codes, categories)
- Performance is critical
- No text analysis is needed

**Use match_phrase query when:**

- Searching for specific phrases in text fields
- Word order matters
- Working with natural language content
- Exact phrase matching is required

### Performance Considerations

While the `term` query is faster, the performance difference may not be significant for small datasets. However, in production environments with millions of documents, choosing the appropriate query type can have a substantial impact on response times and system resources.

Understanding these differences helps you build more efficient Elasticsearch queries and optimize your search functionality based on specific use cases.
