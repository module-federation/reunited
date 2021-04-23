# Reunited 

An example of federated unit testing.
The core concept is to have jest process an already built test file. This allows webpack to intercept and extent the require and runtime capabilities to async fetch tests from another origin. 

If used with our code streaming technology, units of code could be streamed over the network for distributed testing 

How to see federated unit tests working, this is intended for applications using module federation

1) `yarn install`
2) `yarn build`
3) `yarn test`
