# Wattage
*Node.js ratelimiter connected to MongoDB, meant to power clustered and scalable projects.*

## Introduction:
When working with scalable projects (such as those using clustering) requiring some form of rate-limiting technique, it is imperative that the data be shared across clusters in order to prevent abuse.

This module attempts to solve this issue through means of a database, specifically [MongoDB](https://www.mongodb.com/).

This module is primarily for projects that already utilize MongoDB in some shape or form as this module simply creates a single new collection in the database system.

## Initialization:
First, the bucket must be initialized. Your MongoDB connection URI must be handy and accessible for the module to properly connect to your database instance.

Below is an example of a quick initialization.
```javascript
const MONGO_URI = "your mongo URI";

const Ratelimiter = require("wattage");

const rl = new Ratelimiter({
	mongo_uri: MONGO_URI,
	data: {
		reset: 5 * 1000, // 5 seconds
		limit: 5 // 5 uses
	}
}); // a ratelimit for 5 uses per 5 seconds
```
> **NOTE:**  In this example, the name of our bucket is `rl`.
## Methods:
As your bucket has been initialized in the above steps, there are several methods that you may utilize to interface with the bucket.
* **increment()** --- This will allow you to add a use to the particular bucket in question. It takes one argument, the `identifier`, which allows it to discriminate between specific entries in the bucket.
```javascript
rl.increment("An arbitrary identifier string here...");
```
> **TIP:**  For web-server applications, I typically would set the `identifier` as an IP address or user ID (if logged in).
* **canUse()** --- This will allow you to see if a specific `identifier` is not rate-limited; i.e. can use your service. This will return a boolean.
```javascript
if (!await rl.canUse("An arbitrary identifier string here...")) {
	// The `identifier`	is being ratelimited.
	// Implement appropriate logic here.
}
```
> **NOTE:**  Due to the architecture of this specific method, it MUST be asynchronous.
* **getData()** --- Allows you to see how many uses and how much time is remaining for a ratelimited `identifier`.
```javascript
const { next_reset, count } = rl.getData(identifier);
const remainingTime = next_reset - Date.now();
```
> **TIP:**  I typically use this in conjunction with the `canUse()` method.
* **reset()** --- Allows you to forcefully reset an `identifier`'s ratelimit in that bucket.
```javascript
rl.reset("An arbitrary identifier string here...");
```
## Issues & Pull Requests:
I am more than happy to answer any questions, clear anything up, or read through any other types of issues. Please ensure to keep your issues respectful for everyone.

I am also more than happy to review Pull Requests. Same rules above apply to this as well.

### Thanks for using this module!