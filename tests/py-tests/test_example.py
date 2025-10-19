import unittest
import pytest

def add(a, b):
    return a + b

class TestExample(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == '__main__':
    unittest.main()