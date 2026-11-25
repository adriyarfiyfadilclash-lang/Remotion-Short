import React from "react";
import { Atom3D } from "./Atom3D";
import { ChemicalBond3D } from "./ChemicalBond3D";

export type MoleculeAtom = {
  id: string;
  position: [number, number, number];
  radius?: number;
  color?: string;
};
export type MoleculeBond = {
  from: string;
  to: string;
  radius?: number;
  color?: string;
};

type Props = {
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
  atomPulse?: boolean;
};

/** Data-driven molecular model. Bond endpoints are resolved by atom id. */
export const Molecule3D: React.FC<Props> = ({ atoms, bonds, atomPulse = false }) => {
  const byId = new Map(atoms.map((atom) => [atom.id, atom]));
  return (
    <group>
      {bonds.map((bond, index) => {
        const a = byId.get(bond.from);
        const b = byId.get(bond.to);
        if (!a || !b) return null;
        return (
          <ChemicalBond3D
            key={`bond-${index}`}
            start={a.position}
            end={b.position}
            radius={bond.radius}
            color={bond.color}
          />
        );
      })}
      {atoms.map((atom) => (
        <Atom3D
          key={atom.id}
          position={atom.position}
          radius={atom.radius}
          color={atom.color}
          pulse={atomPulse}
        />
      ))}
    </group>
  );
};
