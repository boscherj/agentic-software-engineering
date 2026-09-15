"""Fonctions de calcul utilisées dans les exemples de formation."""


def additionner(a: int, b: int) -> int:
    """Retourne la somme de deux nombres entiers."""
    return a + b


def est_pair(nombre: int) -> bool:
    """Indique si un nombre entier est divisible par deux."""
    return nombre % 2 == 0


def est_multiple_de_trois(nombre: int) -> bool:
    """Indique si un nombre entier est divisible par trois."""
    return nombre % 3 == 0
