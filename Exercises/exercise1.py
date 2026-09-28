#CART 351, EXERCISE ONE
#Benjamin Merhi

###Task 1###

print("------")
print("Task 1: Arithmetic expressions")
print("Expected output: 7")

print((10 + 4) // 2)

###Task 2###

print("\n------")
print("Task 2: Expressions of inequality")
print("Expected output: True")

print(14 < 15)

###Task 3###

print("\n------")
print("Task 3: Variable assignment")
print("Expected output: 54")

a_num_variable = 54
print(a_num_variable)

###Task 4###

print("\n------")
print("Task 4: Types")
print("Expected output: <class 'str'>")

x = 14
y = 17.4
z = "today is a fine day for sailing!"
print(type(z))

###Task 5###

print("\n------")
print("Task 5: Questions about strings")
print("Expected output: 51")

first_line = "It was the best of times."
second_line = "It was the worst of times."
print(len(first_line) + len(second_line)) # your code here!

###Task 6###

print("\n------")
print("Task 6: Questions about strings, part 2")
print("Expected output: 25")

aStringSentence = "Did the cat jump out the window yesterday?"
print(aStringSentence.find("window")) # your code here!

###Task 7###

print("\n------")
print("Task 7: String transformations")
print("Expected output: someone who has spent too much time")

partLy = "     someone who has spent too much time    \n"
print(partLy.strip())

###Task 8###

print("\n------")
print("Task 8: String transformations, part 2")
print("Expected output: SOMEONE WHO HAS SPENT TOO MUCH TIME")

print(partLy.strip().upper())

###Task 9###

print("\n------")
print("Task 9: String indexing")
print("Expected output: p")

offset = 1
print("apple"[offset])

####Task 10###

print("\n------")
print("Task 10: String slices")
print("Expected output: jump")

start = 12
end = 16
aStringSentenceAgain = "Did the cat jump out the window yesterday?"
print(aStringSentenceAgain[start:end])

###Task 11###

print("\n------")
print("Task 11: Integers and strings")
print("Expected output: 100")

print(int("19") + int("81"))

###Task 12###

print("\n------")
print("Task 12: Conditions")
print("Expected output: test_var is less than 200")

test_var = 90
if test_var > 200:	
	print("test_var is greater than 200!")
if test_var < 200:
    print("test_var is less than 200")

###Task 13###

print("\n------")
print("Task 13: Conditions II")
print("Expected output: the condition test passed")

test_var_three = 400
test_var_two = 800
if test_var_three > 200 and test_var_two > 400:	
	print("the condition test passed")
else:
	print("the condition test not passed")