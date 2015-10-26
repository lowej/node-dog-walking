Feature: Admin can add a Dog to their Dog List
  As a system admin
  I want to add a dog to my dog list
  So that I can manage the new dog

  Scenario: Dog added to Dog list
    Given I have an empty dog list
    When I add a dog to the list
    Then The dog list contains a single item

  Scenario: Dog accessible from dog list
    Given I have an empty dog list
    When I add a dog to the list
    Then I can access that dog from the dog list by ID