import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    let exists: boolean = false;
    for (let i = 0; i < this.#items.length; i++) {
      if(this.#items[i].documentId === _documentId){
        this.#items[i].monthlyFee = _fee;
        exists = true;
      }
    }
    if(!exists){
      throw new Error("No existe un socio con ese documento.");
    }
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    return  this.#items.reduce((total, member) => total + (member.monthlyFee)*((100-member.discount)/100), 0);
  }
}
