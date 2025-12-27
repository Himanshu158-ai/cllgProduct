// Select a question & write code
#include <stdio.h>

int main() {
    int a = 12;
    int b = 45;
    int c = 30;

    int max = a;

    if (b > max)
        max = b;
    if (c > max)
        max = c;

    printf("Largest = %d\n", max);
    return 0;
}
