"""Membuat semua efek suara + musik latar sendiri (bebas hak cipta) ke folder public/.
Jalankan: python3 scripts/buat-sfx.py
"""
import os
import wave

import numpy as np

SR = 44100
AKAR = os.path.join(os.path.dirname(__file__), "..", "public")
rng = np.random.default_rng(7)


def simpan(nama, x, gain=0.9):
    x = np.asarray(x, dtype=np.float64)
    puncak = np.max(np.abs(x)) or 1.0
    x = x / puncak * gain
    # fade 5 ms di ujung agar tidak ada bunyi klik
    n = int(0.005 * SR)
    if len(x) > 2 * n:
        x[:n] *= np.linspace(0, 1, n)
        x[-n:] *= np.linspace(1, 0, n)
    data = (x * 32767).astype(np.int16)
    jalur = os.path.join(AKAR, nama)
    os.makedirs(os.path.dirname(jalur), exist_ok=True)
    with wave.open(jalur, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def t(dur):
    return np.arange(int(dur * SR)) / SR


def lowpass(x, alpha):
    """Filter lowpass sederhana; alpha bisa berupa array (berubah tiap sampel)."""
    y = np.zeros_like(x)
    a = np.broadcast_to(alpha, x.shape)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def tambah(a, b):
    """Jumlahkan dua bunyi dengan panjang berbeda."""
    n = max(len(a), len(b))
    x = np.zeros(n)
    x[: len(a)] += a
    x[: len(b)] += b
    return x


def dentum(frek, dur, turun=18.0):
    tt = t(dur)
    f = frek * (1 + 0.6 * np.exp(-tt * 30))
    fase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(fase) * np.exp(-tt * turun)


# Detak "dug-dag": dua dentuman rendah
def detak():
    x = np.zeros(int(0.62 * SR))
    lub = tambah(dentum(58, 0.22, 16), 0.3 * dentum(116, 0.12, 30))
    dub = tambah(dentum(74, 0.16, 22) * 0.75, 0.25 * dentum(148, 0.09, 40))
    x[: len(lub)] += lub
    s = int(0.26 * SR)
    x[s : s + len(dub)] += dub
    return lowpass(x, 0.25)


def whoosh():
    tt = t(0.6)
    n = rng.standard_normal(len(tt))
    env = np.sin(np.pi * np.clip(tt / 0.6, 0, 1)) ** 2
    alpha = 0.02 + 0.25 * env
    return lowpass(n, alpha) * env


def pop():
    tt = t(0.12)
    f = 700 * np.exp(-tt * 25) + 180
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 35)


def ding():
    tt = t(1.0)
    return (np.sin(2 * np.pi * 1320 * tt) + 0.4 * np.sin(2 * np.pi * 2640 * tt) + 0.2 * np.sin(2 * np.pi * 3960 * tt)) * np.exp(-tt * 5)


def tick():
    tt = t(0.04)
    return np.sin(2 * np.pi * 2200 * tt) * np.exp(-tt * 140) + 0.3 * rng.standard_normal(len(tt)) * np.exp(-tt * 300)


def riser():
    tt = t(1.5)
    f = 180 + 1000 * (tt / 1.5) ** 2
    nada = np.sin(2 * np.pi * np.cumsum(f) / SR)
    desis = lowpass(rng.standard_normal(len(tt)), 0.05 + 0.3 * tt / 1.5)
    env = (tt / 1.5) ** 1.6
    return (0.6 * nada + 0.8 * desis) * env


def hit():
    tt = t(0.8)
    boom = dentum(48, 0.8, 5)
    tran = lowpass(rng.standard_normal(len(tt)), 0.4) * np.exp(-tt * 40)
    return boom + 0.6 * tran


def zap():
    tt = t(0.4)
    gergaji = 2 * ((tt * 140) % 1) - 1
    mod = 0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 28 * tt))
    desis = rng.standard_normal(len(tt)) * 0.4
    return lowpass(gergaji * mod + desis, 0.35) * np.exp(-tt * 7)


def gelembung():
    tt = t(0.16)
    f = 300 + 1600 * tt / 0.16
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / 0.16) ** 2


# Musik latar: pad lembut A minor - F - C - G, 24 detik, bisa diulang mulus
def musik():
    dur = 24.0
    tt = t(dur)
    akor = [
        [220.0, 261.63, 329.63],  # Am
        [174.61, 220.0, 261.63],  # F
        [196.0, 261.63, 329.63],  # C
        [196.0, 246.94, 293.66],  # G
    ]
    x = np.zeros_like(tt)
    panjang = dur / 4
    for i, nada in enumerate(akor):
        mulai = i * panjang
        m = (tt >= mulai - 0.8) & (tt < mulai + panjang + 0.8)
        lokal = tt[m] - mulai
        env = np.clip((lokal + 0.8) / 1.6, 0, 1) * np.clip((panjang + 0.8 - lokal) / 1.6, 0, 1)
        suara = np.zeros_like(lokal)
        for f in nada:
            suara += np.sin(2 * np.pi * f * tt[m]) + 0.3 * np.sin(2 * np.pi * 2 * f * tt[m] + 0.5)
            suara += 0.5 * np.sin(2 * np.pi * (f / 2) * tt[m])
        x[m] += suara * env
    # denyut lembut seperti detak, sangat pelan
    denyut = np.zeros_like(tt)
    for k in np.arange(0, dur, 0.833):
        s = int(k * SR)
        d = dentum(55, 0.2, 18) * 0.5
        e = min(len(d), len(denyut) - s)
        denyut[s : s + e] += d[:e]
    x = lowpass(x, 0.08) + 0.6 * denyut
    # sambung ujung agar loop mulus
    n = int(0.8 * SR)
    x[:n] = x[:n] * np.linspace(0, 1, n) + x[-n:] * np.linspace(1, 0, n)
    return x[:-n]


if __name__ == "__main__":
    simpan("sfx/detak.wav", detak())
    simpan("sfx/whoosh.wav", whoosh(), 0.8)
    simpan("sfx/pop.wav", pop(), 0.8)
    simpan("sfx/ding.wav", ding(), 0.7)
    simpan("sfx/tick.wav", tick(), 0.6)
    simpan("sfx/riser.wav", riser(), 0.8)
    simpan("sfx/hit.wav", hit())
    simpan("sfx/zap.wav", zap(), 0.75)
    simpan("sfx/gelembung.wav", gelembung(), 0.7)
    simpan("musik/latar.wav", musik(), 0.8)
    print("Selesai: SFX dan musik dibuat di public/")
