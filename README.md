# PIN Entropy Validator

## Overview
The PIN Entropy Validator is a JavaScript class that implements sophisticated validation rules to prevent users from creating easily guessable PINs. It enforces security best practices by detecting and rejecting common patterns that could make PINs vulnerable to brute force or educated guessing attacks.

## Features

### Pattern Detection
The validator checks for several types of easily guessable patterns:
- Sequential numbers (e.g., 1234, 9876)
- Repeated digits (e.g., 0000, 1111)
- Palindromes (e.g., 1221, 6996)
- Year patterns (e.g., 1990, 2024)
- Arithmetic sequences
- Patterns with insufficient unique digits

### Validation Rules
1. **Basic Format**: PIN must be exactly 4 digits
2. **Unique Digits**: PIN must contain at least 3 different digits
3. **Pattern Restrictions**:
   - No sequential patterns (ascending or descending)
   - No repeated digits (same digit 4+ times)
   - No palindrome patterns
   - No year patterns (19XX or 20XX)
   - No arithmetic sequences

## Usage

### Basic Implementation
```javascript
const userPin = "1234";
const validationResult = PINEntropyValidator.validatePIN(userPin);

if (!validationResult.isValid) {
    console.log(`Please choose a different PIN: ${validationResult.reason}`);
} else {
    console.log("PIN accepted!");
}
```

### Return Value
The validator returns an object with two properties:
- `isValid`: Boolean indicating if the PIN meets security requirements
- `reason`: String explaining why the PIN was rejected or accepted

### Regular Expression Patterns
The class uses several regex patterns to detect common sequences:
```javascript
static PATTERNS = {
    SEQUENTIAL: /^(?:0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/,
    REPEATED: /^(\d)\1{3,}$/,
    PALINDROME: /^(\d)(\d)\2\1$/,
    SIMPLE_ASCENDING: /^0123|1234|2345|3456|4567|5678|6789$/,
    SIMPLE_DESCENDING: /^9876|8765|7654|6543|5432|4321|3210$/,
    YEAR_PATTERN: /^(?:19|20)\d{2}$/
}
```

## Example Test Cases
```javascript
const testPINs = [
    '1234',  // Invalid: Sequential pattern
    '0000',  // Invalid: Repeated digits
    '1111',  // Invalid: Repeated digits
    '9999',  // Invalid: Repeated digits
    '2580',  // Valid
    '1379',  // Valid
    '2024',  // Invalid: Year pattern
    '1221',  // Invalid: Palindrome
    '9876',  // Invalid: Sequential descending
    '2468'   // Invalid: Arithmetic sequence
];
```

## Security Considerations

### Why These Rules Matter
1. **Sequential Patterns**: Easy to guess through simple iteration
2. **Repeated Digits**: Significantly reduces the PIN's entropy
3. **Palindromes**: Common choice due to memorability
4. **Year Patterns**: Often correspond to birth years or significant dates
5. **Arithmetic Sequences**: Easy to guess through pattern recognition

### Entropy Requirements
The validator ensures a minimum level of entropy by:
- Requiring at least 3 unique digits
- Preventing mathematical patterns
- Blocking common date-based patterns

## Customization
The validator can be extended by:
1. Adding new patterns to the `PATTERNS` object
2. Modifying the minimum unique digits requirement
3. Adding additional mathematical pattern checks
4. Adjusting the PIN length requirement

## Implementation Notes
- All PINs are converted to strings for consistent handling
- The validator uses Set objects for efficient unique value checking
- Regular expressions are used for pattern matching efficiency
- Mathematical patterns are detected through difference analysis

## Best Practices
When implementing this validator:
1. Use it as part of a larger security strategy
2. Consider implementing rate limiting
3. Always hash stored PINs
4. Provide clear feedback to users about PIN requirements
5. Consider adding additional validation rules specific to your use case

## License
[Add your preferred license here]

## Contributing
[Add contribution guidelines here]