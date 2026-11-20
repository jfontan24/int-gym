import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
      discount: 10,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total fees with discount", () => {
    list.add(member);
    expect(list.totalDiscounted()).toBe(1350);
  });

  test("updated fees", () => {
    list.add(member);
    list.updateFee("12345678", 1400);
    expect(member.monthlyFee).toBe(1400);
  });

  test("updated fees rejects non existent id", () => {
    list.add(member);
    expect(() => list.updateFee("12345679",1400)).toThrow();
  });
});
