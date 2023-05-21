import sys


file=sys.argv[1]
s=""
f=open(file,"r")
lines=f.readlines()
for i in lines:
    s+=i.replace("\\","\\\\")
print(s)
