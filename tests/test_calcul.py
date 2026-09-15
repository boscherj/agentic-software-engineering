"""Tests du module de calcul."""

from agentic_software_engineering.calcul import additionner, est_pair


def test_additionner_retourne_la_somme_de_deux_entiers() -> None:
    assert additionner(2, 3) == 5


def test_additionner_gere_les_nombres_negatifs() -> None:
    assert additionner(-2, 3) == 1


def test_est_pair_retourne_vrai_pour_un_entier_pair() -> None:
    assert est_pair(2) is True


def test_est_pair_retourne_faux_pour_un_entier_impair() -> None:
    assert est_pair(3) is False


def test_est_pair_consider_zero_comme_pair() -> None:
    assert est_pair(0) is True


def test_est_pair_accepte_un_entier_negatif_pair() -> None:
    assert est_pair(-4) is True
