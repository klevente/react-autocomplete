# react-autocomplete

Example React Autocomplete Component with debouncing and `AbortController`, based on this [video](https://www.youtube.com/watch?v=Ju6VSLKXrJg).

# Improvements, follow-ups:
- How do I handle the loading state? (I did this)
- How do I handle when there are no items found? (Could show some text saying "No Results")
- What to do if the user searches for the same thing multiple times? (In-memory cache)
- How to handle the error state?
- How would I make this accessible? (Screen-readers, keyboard-users)
  - Proper aria-attributes: Component libraries
- How would I make this production-ready?
  - Write tests!
  - Other things mentioned here
  - Document it
  - Maybe generalize it
