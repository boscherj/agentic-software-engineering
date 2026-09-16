"""Tests du module de calcul."""

from agentic_software_engineering.calcul import (
    additionner,
    est_multiple_de_trois,
    est_pair,
)


def test_additionner_retourne_la_somme_de_deux_entiers() -> None:
    assert additionner(2, 3) == 5


def test_additionner_gere_les_nombres_negatifs() -> None:
    assert additionner(-2, 3) == 1


def test_additionner_retourne_5_avec_zero_et_cinq() -> None:
    assert additionner(0, 5) == 5


def test_additionner_retourne_moins_cinq_avec_deux_negatifs() -> None:
    assert additionner(-2, -3) == -5


def test_est_pair_retourne_vrai_pour_un_entier_pair() -> None:
    assert est_pair(2) is True


def test_est_pair_retourne_faux_pour_un_entier_impair() -> None:
    assert est_pair(3) is False


def test_est_pair_consider_zero_comme_pair() -> None:
    assert est_pair(0) is True


def test_est_pair_accepte_un_entier_negatif_pair() -> None:
    assert est_pair(-4) is True


def test_est_multiple_de_trois_retourne_vrai_pour_trois() -> None:
    assert est_multiple_de_trois(3) is True


def test_est_multiple_de_trois_retourne_faux_pour_quatre() -> None:
    assert est_multiple_de_trois(4) is False


def test_est_multiple_de_trois_considere_zero_comme_multiple() -> None:
    assert est_multiple_de_trois(0) is True


def test_est_multiple_de_trois_accepte_un_entier_negatif() -> None:
    assert est_multiple_de_trois(-6) is True


def test_est_multiple_de_trois_retourne_faux_pour_un_negatif_non_multiple() -> None:
    assert est_multiple_de_trois(-4) is False
