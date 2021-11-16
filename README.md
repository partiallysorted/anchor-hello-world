# anchor-hello-world
Example using aNCHOR

Create the anchor workspace.
```
anchor init anchor-hello-world
```

Build all of the dependencies.
```
anchor build
```

Get the ProgramId
```
solana address -k target/deploy/anchor_hello_world-keypair.json
```

Paste into programs/anchor-hello-world/src/lib.rs and Anchor.toml

Check that Solana is using localhost
```
solana config get
```

If not,
```
solana config set --url localhost
```

Test that Solana is ready
```
solana-test-validator
```

Check address and balance.
```
solana address
solana balance
```

Airdrop if necessary.
```
solana airdrop 1000
```

Kill the solana-test-validator.

Run anchor test
```
anchor test
```
