ops = ["5", "2", "C", "D", "+"]
sum_array = []

for i in ops:
    if i == "C":
        sum_array.pop()

    elif i == "D":
        sum_array.append(sum_array[len(sum_array) - 1] * 2)

    elif i == "+":
        sum_array.append((sum_array[len(sum_array) - 1]) + (sum_array[len(sum_array) - 2]))

    else:
        sum_array.append(int(i))

print(sum_array)    