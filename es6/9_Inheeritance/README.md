With most of the gory details of <abbr title="Object-Oriented JavaScript">OOJS</abbr> now explained, this article shows how to create "child" object classes (constructors) that inherit features from their "parent" classes. In addition, we present some advice on when and where you might use <abbr title="Object-Oriented JavaScript">OOJS</abbr>, and look at how classes are dealt with in modern ECMAScript syntax.

## Prototypal inheritance
So far we have seen some inheritance in action — we have seen how prototype chains work, and how members are inherited going up a chain. But mostly this has involved built-in browser functions. How do we create an object in JavaScript that inherits from another object?

Let's explore how to do this with a concrete example.