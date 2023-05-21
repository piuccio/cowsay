import subprocess
from pathlib import Path



p=Path(r'/usr/share/cows').glob('**/*')
f=[str(i) for i in p if i.is_file()]
for i in sorted(f):
    proc=["cowsay","-f",i,"'Helloo'"]
    process = subprocess.Popen(proc,stdout=subprocess.PIPE,stdin=subprocess.PIPE,stderr=subprocess.PIPE)
    out,err=process.communicate()
    output=out.decode().strip()
    print(f"******{i}******")
    print(output)
    print()



