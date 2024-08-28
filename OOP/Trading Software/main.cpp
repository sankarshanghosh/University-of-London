#include <iostream>
using namespace std;

void printMenu()
{
    cout << "1: Print help" << endl;
    cout << "2: Print exchange stats" << endl;
    cout << "3: Place an ask" << endl;
    cout << "4: Place a bid" << endl;
    cout << "5: Print wallet" << endl;
    cout << "6: Continue" << endl;
}

int getUserOption()
{
    int userOption;
    cin >> userOption;
    return userOption;
}

void processUserOption(int userOption)
{
    switch (userOption)
    {
    case 1:
        cout << "Help - choose options from the menu and follow the on screen instructions." << endl;
        break;
    case 2:
        cout << "Exchange stats" << endl;
        break;
    case 3:
        cout << "Place an ask" << endl;
        break;
    case 4:
        cout << "Place a bid" << endl;
        break;
    case 5:
        cout << "Wallet" << endl;
        break;
    case 6:
        cout << "Continue" << endl;
        break;
    default:
        cout << "Invalid option" << endl;
        break;
    }
}

int main()
{
    while (true)
    {
        printMenu();
        int userOption = getUserOption();
        processUserOption(userOption);
    }
    return 0;
}
