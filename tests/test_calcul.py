"""Tests du module de calcul."""

from agentic_software_engineering.calcul import additionner


def test_additionner_retourne_la_somme_de_deux_entiers() -> None:
    assert additionner(2, 3) == 5
