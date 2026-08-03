That classic "Permission denied" error usually happens for one of two reasons: either the **script file isn't executable**, or the shell **needs administrative root permissions**.

Here is how to fix it based on what you are trying to do:

---

## Scenario A: Executing a `.sh` or `.py` file directly

If you tried running `./script.sh` or `./process.py` and got `Permission denied`, the file is missing execution permissions.

### 1. Make the file executable

Run `chmod +x` on the file to grant execute permissions:

```bash
chmod +x script.sh

```

Then try running it again:

```bash
pbpaste | ./script.sh
# or
./script.sh "$(pbpaste)"

```

### 2. Bypass by calling the interpreter directly

Alternatively, you don't need execution permissions if you explicitly invoke the program handling it:

```bash
# For bash scripts
pbpaste | bash script.sh

# For python scripts
pbpaste | python3 process.py

```

---

## Scenario B: System / Root protection

If the script is trying to modify system files, install packages, or access protected directories, standard user privileges won't be enough.

Prepend `sudo` to run the command with administrator rights:

```bash
# If piping clipboard content into bash:
pbpaste | sudo bash

# If passing clipboard content to a script requiring elevated privileges:
sudo ./script.sh "$(pbpaste)"

```

*(You will be prompted to type your macOS password—characters won't show on screen as you type, which is normal).*

---

## Quick Reference Check

| Command | Cause | Solution |
| --- | --- | --- |
| `./script.sh` → `Permission denied` | File mode bit missing `x` | `chmod +x script.sh` |
| Writing to `/usr/local` or `/etc` | Missing root privileges | Add `sudo` before the command |
| `pbpaste | python3` → `Permission denied` | Destination file locked/protected | Check output file permissions or run with `sudo` |
